import os 
import json
import time
from PIL import Image
import pytesseract
import cv2
import numpy as np
# refresh_time = 5 # seconds
# UserData = '/UserData'
# for user_dir in os.listdir():
#     print(user_dir)
# def scan_dir():
#     all_dir = os.listdir()
#     for user_dir in all_dir:
#         print(user_dir)
def scan_dir():
    items = os.listdir(os.getcwd())

    # Filter out only the directories
    directories = [item for item in items if os.path.isdir(item)]

    # Now you have a list of directories in the current directory
    print("List of directories in the current directory:")
    data = []
    old = []
    old_json_len = json.load(open('report.json'))


    for directory in directories:
        subdirectory_path = os.path.join(os.getcwd(), directory)
        images_directory = os.path.join(subdirectory_path, "images") 
        if os.path.exists(images_directory) and os.path.isdir(images_directory):
            # print(f"Performing actions inside the 'images' folder of {directory}")
            for items in os.listdir(images_directory):
                media = os.path.join(images_directory, items)
                old.append(media)
    if len(old) == 0:
        print("No images found")
    elif len(old) == len(old_json_len):
        print("No new images found")
    else:
        for directory in directories:
            subdirectory_path = os.path.join(os.getcwd(), directory)
            images_directory = os.path.join(subdirectory_path, "images") 
            if os.path.exists(images_directory) and os.path.isdir(images_directory):
                # print(f"Performing actions inside the 'images' folder of {directory}")
                for items in os.listdir(images_directory):
                    media = os.path.join(images_directory, items)
                    images= Image.open(media)
                    text = pytesseract.image_to_string(images)
                    image_info = {
                        "path": media,
                        "text": text
                    }
                    data.append(image_info)
                    print(text)
        with open('report.json', 'w') as outfile:
            json.dump(data, outfile,indent=4)
while True:
    scan_dir()
    time.sleep(15)