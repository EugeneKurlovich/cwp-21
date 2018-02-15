const CrudController = require('./crud');

class AgentController extends CrudController {
    constructor(agentService, cacheService) {
        super(agentService, cacheService);

        this.officeAdd = this.officeAdd.bind(this);
        this.officeRemove = this.officeRemove.bind(this);
        this.ra = this.ra.bind(this);
        this.rId = this.rId.bind(this);
        this.createAgent = this.createAgent.bind(this);
        this.updAgent = this.updAgent.bind(this);
        this.delIdAndProp = this.delIdAndProp.bind(this);

        this.routes['/officeadd'] = [{method: 'post', cb: this.officeAdd}];
        this.routes['/officeremove'] = [{method: 'post', cb: this.officeRemove}];
        this.routes['/readAgents'] = [{method: 'post', cb: this.ra}];
        this.routes['/readAgId'] = [{method: 'post', cb: this.rId}];
        this.routes['/createAg'] = [{method: 'post', cb: this.createAgent}];
        this.routes['/updAg'] = [{method: 'post', cb: this.updAgent}];
        this.routes['/delId'] = [{method: 'post', cb: this.delIdAndProp}];

        this.registerRoutes();
    }

    async delIdAndProp(req,res)
    {
        await this.service.delId(req.body);
        res.send("DELETED");
    }

    async updAgent(req, res)
    {
        await this.service.update(req.body);
        res.send("UPDATED");
    }

    async createAgent(req, res)
    {
        await this.service.create(req.body);
        res.send("CREATED");
    }

    async rId(req,res)
    {
        let objAgent = await this.service.readAgents(req.body.id);
        res.json(objAgent);
    }

    async ra (req, res)
    {
        let objAgent = await this.service.readAgents(req.body);
        res.json(objAgent);
    }

    async officeAdd(req, res) {
        await this.service.addOffice(req.body.id, req.body.officeId);

        res.json({success: true});
    }

    async officeRemove(req, res) {
        await this.service.removeOffice(req.body.id);

        res.json({success: true});
    }

    
}

module.exports = (agentService, cacheService) => {
    const controller = new AgentController(agentService, cacheService);

    return controller.router;
};