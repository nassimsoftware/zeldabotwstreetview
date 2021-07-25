pannellum.viewer('panorama', {
    "default": {
        "firstScene": "hyrule-field-1",
        "author": "Matthew Petroff",
        "sceneFadeDuration": 1000
    },

    "scenes": {
        "hyrule-field-1": {
            "title": "Hyrule Field 1",
            "hfov": 110,
            "pitch": -3,
            "yaw": 117,
            "type": "equirectangular",
            "panorama": "/hyrule-field/1.jpg",
            "hotSpots": [
                {
                    "pitch": 5.1,
                    "yaw": 10.0,
                    "type": "scene",
                    "text": "Hyrule Field 2",
                    "sceneId": "hyrule-field-2"
                }
            ]
        },
        
        "hyrule-field-2": {
            "title": "Hyrule Field 2",
            "hfov": 110,
            "pitch": -3,
            "yaw": 117,
            "type": "equirectangular",
            "panorama": "/hyrule-field/2.jpg",
        }
    }
});