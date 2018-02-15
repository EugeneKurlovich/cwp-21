const CrudController = require('./crud');

class PropertyController extends CrudController {
    constructor(propertyService, cacheService) {
        super(propertyService, cacheService);

        this.agentAdd = this.agentAdd.bind(this);
        this.agentRemove = this.agentRemove.bind(this);
        this.ri = this.ri.bind(this);
        this.createProp = this.createProp.bind(this);
        this.updProp = this.updProp.bind(this);
        this.delProp = this.delProp.bind(this);
        this.readAll = this.readAll.bind(this);

        this.routes['/agentadd'] = [{method: 'post', cb: this.agentAdd}];
        this.routes['/agentremove'] = [{method: 'post', cb: this.agentRemove}];
        this.routes['/readID'] = [{method: 'post', cb: this.ri}];
        this.routes['/createProp'] = [{method: 'post', cb: this.createProp}];
        this.routes['/updProp'] = [{method: 'post', cb: this.updProp}];
        this.routes['/delProp'] = [{method:'post',cb: this.delProp}];
        this.routes['/readall'] = [{method:'post', cb: this.readAll}];

        this.registerRoutes();
    }

    async readAll(req, res)
    {
       let objProp = await this.service.ra(req.body);
       res.json(objProp);
    }

    async delProp(req, res)
    {
        await this.service.deleteID(req.body.id);
        res.json({success: true});
    }

    async updProp (req, res)
    {
       let check =  await this.service.update(req.body);
       if (check)
        res.json({success: true});
        else
        res.send("ERROR UPDATE");
    }

    async createProp (req,res)
    {
       let check = await this.service.create(req.body);
       if (check)
       {
            res.json(req.body);
       }
       else
       {
           res.send("ERROR CREATE");
       }
        
    }

    async ri (req,res)
    {
       let item = await this.service.readID(req.body.id);
        res.json(item);
    }

    async agentAdd(req, res) {
        await this.service.addAgent(req.body.id, req.body.agentId);

        res.json({success: true});
    }

    async agentRemove(req, res) {
        await this.service.removeAgent(req.body.id);

        res.json({success: true});
    }
}

module.exports = (propertyService, cacheService) => {
    const controller = new PropertyController(propertyService, cacheService);

    return controller.router;
};