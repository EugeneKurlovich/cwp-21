const CrudController = require('./crud');

class OfficeController extends CrudController {
    constructor(agentService, cacheService) {
        super(agentService, cacheService);

        this.readAgents = this.readAgents.bind(this);
        this.readA = this.readA.bind(this);
        this.readId = this.readId.bind(this);
        this.createOffice = this.createOffice.bind(this);
        this.upd = this.upd.bind(this);
        this.delID = this.delID.bind(this);

        this.routes['/ca'] = [{method: 'post',cb: this.createOffice}];
        this.routes['/agents'] = [{method: 'post', cb: this.readAgents}];
        this.routes['/ra'] = [{method: 'post', cb: this.readA}];
        this.routes['/rId'] = [{method: 'post', cb: this.readId}];
        this.routes['/upd'] = [{method: 'post', cb: this.upd}];
        this.routes['/di'] = [{method: 'post', cb: this.delID}];

        this.registerRoutes();
    }

    async delID(req, res)
    {   
        await this.service.del(req.body.id);
        res.send("OFFICE DELETED");
    }

    async upd(req, res)
    {
        await this.service.update(req.body);
        res.send("OFFICE UPDATED");
    }

    async createOffice(req, res)
    {
        await this.service.create(req.body);
        res.send("OFFiCE CREATED");
    }

    async readId(req, res)
    {
        let obj = await this.service.readId(req.body.id);
        res.json(obj);
    }

    async readA(req, res)
    {
        let obj = await this.service.readA(req.body);
        res.json(obj);
    }

    async readAgents(req, res) {
        res.json(await this.service.readAgents(req.body.id, req.query));
    }
}

module.exports = (officeService, cacheService) => {
    const controller = new OfficeController(officeService, cacheService);

    return controller.router;
};