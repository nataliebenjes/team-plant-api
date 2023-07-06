## Plant Professor

Plant Professor is a web application that provides information about plants. Users can search for plants by their common, growth conditions, or find nurseries near them based on their city and zipcode.

## Technologies Used

* _HTML_
* _CSS_
* _JavaScript_
* _Webpack_
* _Babel_
* _Fetch API_
* _ExchangeRate-API_

### Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-Used)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributors](#Contributors)
- [License](#license)

### Project Overview

Plant Professor is a web application built using HTML, CSS, and JavaScript. It consists of the following pages:

- \`index.html\`: The landing page of the application that provides an overview of Plant Professor and options to search for plants by name, growth conditions, or find nurseries near the user.
- \`name.html\`: Allows users to search for plants by their common or Latin names.
- \`criteria.html\`: Enables users to search for plants based on specific growth conditions such as sunlight requirements, watering needs, and plant life cycle.
- \`zipcode.html\`: Allows users to search for nurseries near them by providing their city and zipcode.

###Technologies Used:

* _HTML_
* _CSS_
* _JavaScript_
* _Webpack_
* _Babel_
* _Fetch API_
* _Bing Maps API_
* _Perenual API_

### Installation

1. Clone the repository:

```bash
   \`$ git clone https://github.com/nataliebenjes/team-plant-api/tree/main\`
   \`$ cd team-plant-api\`
```

2. Install the dependencies

```bash
$ npm install
```

3. Create a `.env` file in the root of your project and add your API keys:
'API_KEY' for [Perenual](https://perenual.com/plant-survey-quiz-test)
'BING_KEY' for [Bing Maps](https://learn.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/base-url-structure)
The format should be like this:

```bash
API_KEY=your_api_key_number
BING_KEY=your_api_key_number
```

4. Run the application

```bash
$ npm start
```

### Usage

The Plant Professor web application provides a user-friendly interface to search for plant information. Here's a brief description of each page's functionality:

- \`index.html\`: The landing page that welcomes users and provides an overview of the application. Users can choose to search for plants by name or growth conditions or find nurseries near them.
- \`name.html\`: Allows users to search for plants by entering either the common name or Latin name of the plant.
- \`criteria.html\`: Enables users to search for plants based on specific growth conditions such as the amount of sunlight, watering needs, and plant life cycle.
- \`zipcode.html\`: Allows users to find nurseries near them by entering their city and zipcode.

Simply click on the relevant link or button on the respective page to perform the desired search.

### Features

- Search plants by name: Users can search for plants by their common or Latin names using the \`name.html\` page.
- Search plants by growth conditions: Users can find plants based on specific growth conditions, such as sunlight requirements, watering needs, and plant life cycle, using the \`criteria.html\` page.
- Find nurseries near you: Users can search for nurseries near them by providing their city and zipcode on the \`zipcode.html\` page.

### Contributors
The following individuals have contributed to the development of this project:

- [Elshadai "Elle" Hailu](https://github.com/ellehailu)
- [Natalie Benjes](https://github.com/nataliebenjes)
- [Suzanne Schuber](https://github.com/SuzSch)
- [Moshe Atia Poston](https://github.com/Object-ions)
- [Jason Church](https://github.com/elijahchurch)
- [Michael Carroll](https://github.com/mcarroll138)

### License
[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2023 Elshadai "Elle" Hailu, Natalie Benjes, Suzanne Schuber, Moshe Atia Poston, Jason Church, Michael Carroll.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
