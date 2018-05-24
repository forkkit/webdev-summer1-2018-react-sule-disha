let _singleton = Symbol();
//const MODULE_API_URL = 'http://localhost:8080/api/course/CID/module';
//const MODULE_API_URL2 = 'http://localhost:8080/api/module/MODULE_ID';

const MODULE_API_URL = 'https://disha-sule-webdev-summer1-2018.herokuapp.com/api/course/CID/module';
const MODULE_API_URL2 = 'https://disha-sule-webdev-summer1-2018.herokuapp.com/api/module/MODULE_ID';

export default class ModuleService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }

    createModule(courseId, module) {
        return fetch(MODULE_API_URL.replace('CID', courseId),
            {
                body: JSON.stringify(module),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            }).then(function (response) {
            return response.json();
        })
    }

    deleteModule(moduleId) {
        return fetch(MODULE_API_URL2.replace
        ('MODULE_ID', moduleId), {
            method: 'delete'
        })
    }


    findAllModulesForCourse(courseId) {
        return fetch(
            MODULE_API_URL.replace('CID', courseId)).then(function (response) {
            return response.json();
        })
    }


}
