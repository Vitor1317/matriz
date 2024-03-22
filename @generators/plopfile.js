export default function (plop) {
  plop.setGenerator('view', {
    description: 'application view logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'view name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/{{dashCase name}}/index.html',
        templateFile: 'templates/index.html.hbs',
      },
      {
        type: 'add',
        path: '../src/{{dashCase name}}/styles.css',
        templateFile: 'templates/styles.css.hbs',
      },
      {
        type: 'add',
        path: '../src/{{dashCase name}}/scripts.js',
        templateFile: 'templates/scripts.js.hbs',
      },
    ],
  });
}
