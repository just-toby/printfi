#!/bin/bash
curl -i -X POST -H 'Content-Type: application/json' -H 'x-cc-webhook-signature: 44533d4026c47005915e1129b0c6a5fefbaf15aea6966dd53918d2f9c9beea0a' -d '{"id":45,"scheduled_for":"2017-01-31T20:50:02Z","event":{"id":"24934862-d980-46cb-9402-43c81b0cdba6","resource":"event","type":"charge:confirmed","api_version":"2018-03-22","created_at":"2017-01-31T20:49:02Z","data":{"code":"66BEOV2A","name":"The Sovereign Individual","description":"Mastering the Transition to the Information Age","hosted_url":"https:\/\/commerce.coinbase.com\/charges\/66BEOV2A","created_at":"2017-01-31T20:49:02Z","expires_at":"2017-01-31T21:49:02Z","timeline":[{"time":"2017-01-31T20:49:02Z","status":"NEW"}],"metadata":{"cart_items": "[{\"name\":\"Avastar #10082\",\"token_id\":\"10082\",\"collection_slug\":\"test_slug_for_upscaler\",\"preview_uri\":\"https://lh3.googleusercontent.com/QrbYa-YED5gR9eihaxsyN1fmttVV8C7B7g4l6OGpx5knKMTbDD5knLFfwVV8_g6dbhnJacyjXz8CPDhuxFzYs_Q=s128\",\"original_uri\":\"https://hashmasksstore.blob.core.windows.net/hashmasks/8510.jpg\",\"config\":{\"size\":\"20\\\"x30\\\"\",\"frame\":\"Black\",\"glass\":\"Glossy\",\"space\":\"0\\\"\"}}]","mailing_address": "{\"name\":\"test bob\",\"email\":\"bobber@bob.com\",\"address\":\"bob street\",\"address2\":\"apt bob\",\"city\":\"bob city\",\"state\":\"PA\",\"zip\":\"bobob\"}"},"pricing_type":"no_price","payments":[],"addresses":{"bitcoin":"mymZkiXhQNd6VWWG7VGSVdDX9bKmviti3U","ethereum":"0x419f91df39951fd4e8acc8f1874b01c0c78ceba6"}}}}' http://localhost:3000/api/coinbase
