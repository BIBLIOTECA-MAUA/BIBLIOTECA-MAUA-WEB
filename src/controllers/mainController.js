export class MainController {
    constructor() {

    }


    async getIndex(req, res){
        try {
            res.render('pages/home', { title: 'BookFy' });
        } catch (error) {
            res.render('error', {error} );
        }
    }

    async getContact(req, res){
        try {
            res.render('pages/contact', { title: 'Contact' });
        } catch (error) {
            res.render('error', {error} );
        }
    }

    async getAbout(req, res){
        try {
            res.render('pages/about', { title: 'About' });
        } catch (error) {
            res.render('error', {error} );
        }
    }

    async getCommunity(req, res){
        try {
            res.render('pages/community', { title: 'Community' });
        } catch (error) {
            res.render('error', {error} );
        }
    }

    async getProject(req, res){
        try {
            res.render('pages/project', { title: 'Project' });
        } catch (error) {
            res.render('error', {error} );
        }
    }
}