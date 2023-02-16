import requests
import json
from config import api_key
from pprint import pprint
from datetime import date as dt
import pandas as pd



def get_static_info():
    url = f'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key={api_key}'
    response = requests.get(url).json()

    today = dt.today()
    asteroid_list = []

    for asteroid in response['near_earth_objects']:
        
        for date in asteroid['close_approach_data']:
            if pd.to_datetime(date['close_approach_date']) > pd.to_datetime(today):
                break
            else:
                speed = date['relative_velocity']['miles_per_hour']
                distance = date['miss_distance']['lunar']
                close_date = date['close_approach_date']
        
        asteroid_list.append({
            'name': asteroid['name_limited'],
            'id': asteroid['id'],
            'est_dia_max': asteroid['estimated_diameter']['kilometers']['estimated_diameter_max'],
            'est_dia_min': asteroid['estimated_diameter']['kilometers']['estimated_diameter_min'],
            'speed': speed,
            'distance': distance,
            'date': close_date
        })

    asteroid_data_df = pd.json_normalize(asteroid_list)

    asteroid_data_df['estimated_diameter'] = (asteroid_data_df['est_dia_max'] + asteroid_data_df['est_dia_min']) / 2
    asteroid_data_df['id'] = asteroid_data_df['id'].astype('int64')
    asteroid_data_df['speed'] = asteroid_data_df['speed'].astype('float64')
    asteroid_data_df['distance'] = asteroid_data_df['distance'].astype('float64')
    asteroid_data_df['date'] = pd.to_datetime(asteroid_data_df['date'])

    return asteroid_data_df



def get_all_info():
    url = f'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key={api_key}'
    response = requests.get(url).json()

    asteroid_list = []

    for asteroid in response['near_earth_objects']:
        
        for date in asteroid['close_approach_data']:
            
            speed = date['relative_velocity']['miles_per_hour']
            distance = date['miss_distance']['lunar']
            close_date = date['close_approach_date']
        
            asteroid_list.append({
                'name': asteroid['name_limited'],
                'id': asteroid['id'],
                'est_dia_max': asteroid['estimated_diameter']['kilometers']['estimated_diameter_max'],
                'est_dia_min': asteroid['estimated_diameter']['kilometers']['estimated_diameter_min'],
                'speed': speed,
                'distance': distance,
                'date': close_date
            })

    asteroid_data_df = pd.json_normalize(asteroid_list)

    asteroid_data_df['estimated_diameter'] = (asteroid_data_df['est_dia_max'] + asteroid_data_df['est_dia_min']) / 2
    asteroid_data_df['id'] = asteroid_data_df['id'].astype('int64')
    asteroid_data_df['speed'] = asteroid_data_df['speed'].astype('float64')
    asteroid_data_df['distance'] = asteroid_data_df['distance'].astype('float64')
    asteroid_data_df['date'] = pd.to_datetime(asteroid_data_df['date'])

    return asteroid_data_df
