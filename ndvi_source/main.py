import numpy as np
import rasterio
from terracatalogueclient import Catalogue,client
from terracatalogueclient.config import CatalogueConfig
from pyproj import Transformer
import argparse
import os
from dotenv import load_dotenv
from fastapi import FastAPI
import json
from pydantic import BaseModel


app = FastAPI()

class Item(BaseModel):
    north: float
    west: float
    south: float
    east: float
    output: str


@app.post("/")
async def root(item: Item):
    return nvdi_service(item)

def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--north', type=float, required=False, default=42.65604, help='Provide North Coordinate')
    parser.add_argument('--west', type=float, required=False, default=1.40625, help='Provide West Coordinate')
    parser.add_argument('--south', type=float, required=False, default=42.42849, help='Provide South Coordinate')
    parser.add_argument('--east', type=float, required=False, default=1.79825, help='Provide East Coordinate')
    parser.add_argument('--output', type=str, required=False, default=".", help='Provide path to store output')
    return parser.parse_args()

def load_envs():
    # Get the absolute path of the project's root directory
    project_root = os.path.dirname(os.path.abspath(__file__))
    #project_root = os.path.dirname(project_root)  # Move up to the project root

    # Construct the full path to the environment file
    env_file = os.path.join(project_root, ".env")
    conf_file = os.path.join(project_root, "terra_config.ini")

    if not os.path.exists(env_file):
        print(f"\n[-] The environment file does not exist '{project_root}'\n")
        return 0

    # Load the environment variables from the file
    load_dotenv(env_file)

    # Load config objects
    config = CatalogueConfig.from_file(conf_file)
    
    return config

def auth_catalogue(config):
    # Get catalogue object
    catalogue = Catalogue(config)
    # Authenticate
    catalogue = Catalogue().authenticate_non_interactive(os.getenv('user'),os.getenv('key'))#"cassini_hack","N3wP4ssw0rd$$")
    
    
    return catalogue

def get_products(coordinates,catalogue,collect):
    products = catalogue.get_products(
        collection=collect,
        start="2021-01-01",
        end="2021-12-01",
        bbox=coordinates,
        accessedFrom="HTTP"
    )
      
    #paths = [pf.href for p in products for pf in p.data]

    last_product = None

    # Iterate through the generator to get products
    for p in products:
        last_product = p  # Get the last product object

    # Check if last_product is not None and return it
    if last_product:
        return last_product,last_product.title
    else:
        print("No products found for the given coordinates and dates")
        return None
  

def calculate_nvdi(file_path):
    # Open the GeoTIFF file
    with rasterio.open(file_path) as dataset:
        # Reflectance in the near-infrared band
        red = dataset.read(1).astype('float32')
        nir = dataset.read(4).astype('float32')

    ndvi = (nir - red) / (nir + red)

    # Mask out invalid values (e.g., if nir + red == 0)
    ndvi = np.where((nir + red) == 0, np.nan, ndvi)

    # Calculate the mean NDVI value, ignoring NaN values
    mean_ndvi = np.nanmean(ndvi)

    return mean_ndvi

def download_image(catalogue,product,client):
        product_files = catalogue.download_product(
            product=product,
            path="."
        )
        
        return product_files[0].href if product_files else None


def write_ndvi_to_json(mean_ndvi, output_file):
    ndvi_data = {
        "mean_ndvi": float(mean_ndvi)
    }
    
    with open(output_file+"/ndvi.json", 'w') as json_file:
        json.dump(ndvi_data, json_file)
    return ndvi_data

def nvdi_service(item: Item):
    # load config for api access to terra catalogue api: 
    config = load_envs()
    # load the catalog
    catalogue = auth_catalogue(config)

    # Get collection from sentinel-2
    #sent2 = catalogue.get_collections(platform="Sentinel-2")
    
    
    #for c in sent2:
        #print(f"{c.id} - {c.properties['title']}")
        #print(c)
    
    # Test collection
    collection = "urn:eop:VITO:ESA_WorldCover_S2RGBNIR_10m_2021_V2"

    coordinates = [item.west,item.south,item.east,item.north]

    # get images and select the last one
    image,title = get_products(coordinates,catalogue,collection)

    dimage = download_image(catalogue, image,client)

    # extract nvdi
    mean_ndvi = calculate_nvdi(f"./{title}/{title}.tif")

    jsonObject = write_ndvi_to_json(mean_ndvi, item.output)
    
    print(f"NDVI calculation complete: {mean_ndvi}. Output written to {item.output}")
    return jsonObject
 


