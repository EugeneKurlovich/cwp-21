const CrudService = require('./crud');
const validator = require('../helpers/validator');

class OfficeService extends CrudService {

    constructor(repository, schema, errors) {
        super(repository, errors);

        this.schema = schema;
    }

    async readA(data)
    {
        return super.readChunk(data);
    }

    async readId(id)
    {
        return super.read(id);
    }    

    async del (id)
    {
        return super.delete(id);
    }

    async create(data) {
        super.create(data);
    }

    async update(data) {
        return super.update(data.id, data);
    }

    async readAgents(officeId, options) {
        options = {
            limit: Number(options.limit) || this.defaults.readChunk.limit,
            offset: Number(options.offset) || this.defaults.readChunk.offset
        };

        const office = await this.repository.findById(officeId);

        if (!office) {
            throw this.errors.notFound;
        }

        return office.getAgents(options);
    }

}

module.exports = OfficeService;