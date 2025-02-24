# data-generator

to run this data generator, you need to first create an index defintion using a rest client (eg. POSTMAN). Http PUT to http://localhost:9200/cars

```
{
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0,
        "max_result_window": 400000
    },
    "mappings": {
        "car": {
            "_all": {
                "enabled": false
            },
            "properties": {
                "model": {
                    "type": "keyword",
                    "copy_to": [
                        "full_text"
                    ]
                },
                "make": {
                    "type": "keyword",
                    "copy_to": [
                        "full_text"
                    ]
                },
                "price": {
                    "type": "float"
                },
                "mileage": {
                    "type": "integer"
                },
                "year": {
                    "type": "integer",
                    "copy_to": [
                        "full_text"
                    ]
                },
                "body_style": {
                    "type": "keyword",
                    "copy_to": [
                        "full_text"
                    ]
                },
                "condition": {
                    "type": "keyword",
                    "copy_to": [
                        "full_text"
                    ]
                },
                "transmission": {
                    "type": "keyword",
                    "copy_to": [
                        "full_text"
                    ]
                },
                "fuel_type": {
                    "type": "keyword"
                },
                "city_mpg": {
                    "type": "float"
                },
                "highway_mpg": {
                    "type": "float"
                },
                "full_text": {
                    "type": "text"
                }
            }
        }
    }
}
```
You will also need the example data set from (http://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip) in the same folder. Then,

```
npm install
```

followed by 

```
node index.js
```
