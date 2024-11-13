import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'onthispage-component',
    standalone: true,
    imports: [],
    templateUrl: 'onthispage.component.html'
})
export class OnThisPageComponent {

    datas = [
        {
            title: {
                id: 'introduction',
                name: 'Introduction'
            },
            sub_title: [
                {
                    id: 'what-is-serverless',
                    name: 'What is serverless?'
                },
                {
                    id: 'why-aws-lambda',
                    name: 'Why AWS Lambda?'
                },
                {
                    id: 'why-use-node-js-with-aws-lambda',
                    name: 'Why Use Node.js with AWS Lambda?'
                },
                {
                    id: 'aws-lambda-basics',
                    name: 'AWS Lambda Basics'
                }
            ]
        },
        {
            title: {
                id: 'getting-started',
                name: 'Getting Started'
            },
        }
    ];
}
