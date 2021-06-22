var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function() {
    return this.family_name + ' ' + this.first_name;
});
// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(() => {
    return this.date_of_death.getYear() - this.date_of_birth.getYear();
});
// Virtual for author's URL
AuthorSchema.virtual('url').get(() => {
    return '/catalog/author/' + this._id;
});
//Export model
module.exports = mongoose.model('Author', AuthorSchema);