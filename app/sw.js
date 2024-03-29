/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// Version 0.1

'use strict';

console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message', event);

  fetch('http://localhost:7777/showNotification').then(function(response) {
    if (response.status !== 200) {
      // Either show a message to the user explaining the error  
      // or enter a generic message and handle the
      // onnotificationclick event to direct the user to a web page  
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      throw new Error();
    }

    // Examine the text in the response  
    return response.json().then(function(data) {
      if (data.error || !data.notification) {
        console.error('The API returned an error.', data.error);
        throw new Error();
      }
      
      var title = 'Issue Change';
      var message = data.notification.message;

      return self.registration.showNotification(title, {
        body: message
      });
    });
  });
});

  self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag', event.notification.tag);
    // Android doesn't close the notification when you click it
    // See http://crbug.com/463146
    event.notification.close();

    var url = 'http://localhost:3000';
    // Check if there's already a tab open with this URL.
    // If yes: focus on the tab.
    // If no: open a tab with the URL.
    event.waitUntil(
      clients.matchAll({
        type: 'window'
      })
        .then(function(windowClients) {
          console.log('WindowClients', windowClients);
          for (var i = 0; i < windowClients.length; i++) {
            var client = windowClients[i];
            console.log('WindowClient', client);
            if (client.url === url && 'focus' in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(url);
          }
        })
    );
  });