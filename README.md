# Folder Structure

├── config #configurations\
├── public\
│ └── favicon.png # Favicon\
├── src\
│ ├── assets # Local static resources\
│ ├── components # Business common components\
│ ├── e2e # Integration test case\
│ ├── layouts # General layout\
│ ├── models # Global dva model\
│ ├── pages # Business page entry and common templates\
│ ├── services # Background interface services\
│ ├── utils # tool library\
│ ├── locales # Internationalized resources\
│ ├── global.less # global style\
│ └── global.ts # Global JS\
├── tests # test tools\
├── README.md\
└── package.json\

### Page code structure
src\
├── components\
└── pages\
    ├── Order // example\
    | ├── index.tsx\
    | └── index.less\
    ├── User\
    | ├── components # public component collection under group\
    | ├── Login // page under group Login\
    | ├── Register // page under group Register\
    | └── util.ts // There can be some shared methods here depending on the business scenario\
    └── * // Other page component codes\
