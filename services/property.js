const CrudService = require('./crud');
const validator = require('../helpers/validator');

class PropertyService extends CrudService {

    constructor(repository, agentsRepository, schema, errors) {
        super(repository, errors);

        this.agentsRepository = agentsRepository;
        this.schema = schema;
    }

    async ra(data)
    {
        return super.readChunk(data);
    }

    async deleteID(data)
    {
        return super.delete(data);
    }

    async readID(data)
    {
        return super.read(data);
    }

    async create(data) {
        let validCheck = validator(this.schema, data);
        if (!validCheck)
        {
            return false;
        }
        else
        {
            super.create(data);
            return true;
        }  
    }

    async update(data) {

        let validCheck = validator(this.schema, data);
        if (!validCheck)
        {
            return false;
        }
        else
        {
            super.update(data.id, data);
            return true;
        }
    }

    async addAgent(propId, agentId) {
        const agent = await this.agentsRepository.findById(agentId);

        if (!agent) {
            throw this.errors.notFound;
        }

        return super.update(propId, {agentId});
    }

    async removeAgent(propId) {
        return super.update(propId, {agentId: null});
    }
}

module.exports = PropertyService;