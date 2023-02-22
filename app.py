
#iporting needed libraries
from flask import Flask, jsonify, render_template
from api_collector import get_static_info, get_all_info

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

#for reading database data
db_path = 'sqlite:///db/asteroids.sql'
engine = create_engine(db_path)

#Only needed for first time running
static_df = get_static_info()
static_df.to_sql('static', con=engine, if_exists='replace')

#Only needed for first time running
all_time_df = get_all_info()
all_time_df.to_sql('time', con=engine, if_exists='replace')

#running flask
app = Flask(__name__)

#assembling local api
@app.route('/api/all')
def all():
    session = Session(bind=engine)
    execute_string = 'select * from time'
    asteroids = engine.execute(execute_string).fetchall()
    session.close()

    asteroid_list = []
    for row in asteroids:
        asteroid_list.append({
            'name': row[1],
            'id': row[2],
            'est_dia_max': row[3],
            'est_dia_min': row[4],
            'speed': row[5],
            'distance': row[6],
            'date': row[7],
            'estimated_diameter': row[8]
        })
    
    return(jsonify(asteroid_list))

#assembling local api
@app.route('/api/base')
def base():
    session = Session(bind=engine)
    execute_string = 'select * from static'
    asteroids = engine.execute(execute_string).fetchall()
    session.close()

    asteroid_list = []
    for row in asteroids:
        asteroid_list.append({
            'name': row[1],
            'id': row[2],
            'est_dia_max': row[3],
            'est_dia_min': row[4],
            'speed': row[5],
            'distance': row[6],
            'date': row[7],
            'estimated_diameter': row[8]
        })
    
    return(jsonify(asteroid_list))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/bubble')
def bubble():
    return render_template('bubble.html')

@app.route('/bar')
def bar():
    return render_template('bar.html')

@app.route('/line')
def line():
    return render_template('lines.html')

if __name__ == "__main__":
    app.run(debug=True)
