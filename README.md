- Node and JDK Version
node v16.13.2
openjdk version 11.0.2 2079-01-05
Openjdk RE 18.9 b11.0.2+9
64bit VM 18.9

- React-native
"react": "17.0.2",
"react-native": "0.67.1",


- Packages Installation

React Navigation v5
"react-native-vector-icons": "^9.0.0",
"@react-navigation/bottom-tabs": "^5.11.15",
"@react-navigation/native": "^5.9.8",
"@react-navigation/stack": "^5.14.9",

    - Here
npm install @react-navigation/native@^5.x
npm install @react-native-reanimated@2.2.4
npm install  react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view

- Maps
"react-native-maps": "0.30.1",



Descriptions
- สามารถ Run Application บนมือถือได้
- Install Package 
    - react-native-maps

- การ setup react-native-maps
    - android/app/src/main/AndroidManifest.xml ใส่โค้ดต่อไปนี้ใต้ tag <application>
       <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="YOUR_API_KEY"/> <!-- Your key goes here. -->
 
   <!-- You will also only need to add this uses-library tag -->
   <uses-library android:name="org.apache.http.legacy" android:required="false"/>

- เมื่อกดมาที่หน้า Home จะพบเห็นว่ามี Google Map เรียกมาที่จุด Latitude Longitude ที่กำหนด และมีวงกลมล้อมรอบ