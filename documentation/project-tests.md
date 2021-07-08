
- Single tag is a string not string[] but still seems to work as expected
- Should we handle case issues? Search by lowercase?

Successful tests: 

http://localhost:4000/projects/?tags=solo&tags=Python
http://localhost:4000/projects/?tags=solo
http://localhost:4000/projects/?status=true

Not working:
http://localhost:4000/projects/?status=false
- returns true and false

http://localhost:4000/projects/?tags=solo&rcId=1234
- should return 0 results for invalid user

```
[
    {
        "collaborators": [
            {
                "_id": "60df5ae00e8f43f1495e7939",
                "first_name": "Amanda",
                "last_name": "Pettenati"
            }
        ],
        "tags": [
            {
                "_id": "60ddf759dcdd55f269b08b29",
                "value": "solo"
            },
            {
                "_id": "60df966bdcdd55f269192aad",
                "value": "react"
            }
        ],
        "_id": "60df966bf0781b84c13ff9cf",
        "title": "Sample Project 1",
        "description": "A sample description of a sample project",
        "githubLink": "https://github.com/User1/sample_project1",
        "active": true,
        "owner": {
            "_id": "60df61967a3fe13df29c9681",
            "first_name": "Artur",
            "last_name": "Szerejko",
            "zulip_id": 399441,
            "image_path": "https://assets.recurse.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWXM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2b2f7353c9e868938bab92b6f3f69a9bf9550272/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lNTVRVd2VERTFNQVk2QmtWVSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d8f54fe211cbe3254ece86a55c83c4d5b374eaab/profile_pic.jpg",
            "batchEndDate": "2021-08-06T00:00:00.000Z",
            "batch": "S2'21"
        },
        "createdAt": "2021-07-02T22:42:51.180Z",
        "updatedAt": "2021-07-02T22:42:51.180Z",
        "__v": 0
    }
]
```

http://localhost:4000/projects/?tags=solo&status=false

- should return 0 results

```
[
    {
        "collaborators": [
            {
                "_id": "60df5ae00e8f43f1495e7939",
                "first_name": "Amanda",
                "last_name": "Pettenati"
            }
        ],
        "tags": [
            {
                "_id": "60ddf759dcdd55f269b08b29",
                "value": "solo"
            },
            {
                "_id": "60df966bdcdd55f269192aad",
                "value": "react"
            }
        ],
        "_id": "60df966bf0781b84c13ff9cf",
        "title": "Sample Project 1",
        "description": "A sample description of a sample project",
        "githubLink": "https://github.com/User1/sample_project1",
        "active": true,
        "owner": {
            "_id": "60df61967a3fe13df29c9681",
            "first_name": "Artur",
            "last_name": "Szerejko",
            "zulip_id": 399441,
            "image_path": "https://assets.recurse.com/rails/active_storage/representations/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBWXM9IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2b2f7353c9e868938bab92b6f3f69a9bf9550272/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCam9MY21WemFYcGxTU0lNTVRVd2VERTFNQVk2QmtWVSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--d8f54fe211cbe3254ece86a55c83c4d5b374eaab/profile_pic.jpg",
            "batchEndDate": "2021-08-06T00:00:00.000Z",
            "batch": "S2'21"
        },
        "createdAt": "2021-07-02T22:42:51.180Z",
        "updatedAt": "2021-07-02T22:42:51.180Z",
        "__v": 0
    }
]
```

http://localhost:4000/projects/?tags=bootstrap&status=true
- returns true and false, should just return true

returns all projects - is this good to have this expected behavior?
http://localhost:4000/projects/?rcId=1234
