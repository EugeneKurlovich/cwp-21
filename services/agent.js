const CrudService = require('./crud');
const validator = require('../helpers/validator');

class AgentService extends CrudService {

    constructor(repository, officesRepository, schema, errors) {
        super(repository, errors);

        this.officesRepository = officesRepository;
        this.schema = schema;
    }


    async delId(data)
    {
        super.delete(data.id)
    }

    async readAgents(data)
    {
        return super.read(data);
    }

    async create(data) {

        let validCheck = validator(this.schema, data);
        if (!validCheck)
        {
            console.log("CREATE ERROR");
        }
          else
          {
            super.create(data);
          }
    }

    async update(data) {
        return super.update(data.id, data);
    }


    async addOffice(agentId, officeId) {
        const office = await this.officesRepository.findById(officeId);

        if (!office) {
            throw this.errors.notFound;
        }

        return super.update(agentId, {officeId});
    }

    async removeOffice(agentId) {
        return super.update(agentId, {officeId: null});
    }

    async readProperties(agentId, options) {
        options = {
            limit: Number(options.limit) || this.defaults.readChunk.limit,
            offset: Number(options.offset) || this.defaults.readChunk.offset
        };
        const agent = await this.repository.findById(agentId);

        if (!agent) {
            throw this.errors.notFound;
        }

        return agent.getProperties(options);
    }

}

module.exports = AgentService;