module.exports = function(schema, readOnlyFields) {
    schema.pre('save', function(next) {
        if (this.isNew) {
            readOnlyFields.forEach(field => {
                this[field] = schema.path(field).defaultValue;
            });
        } else {

            readOnlyFields.forEach(field => {
                this[field] = this.get(field);
            });
        }
        next();
    });

    const protectReadOnlyFields = function(next) {
        if (this._update) {

            readOnlyFields.forEach(field => {
                if (this._update[field]) {
                    delete this._update[field];
                }
                if (this._update.$set && this._update.$set[field]) {
                    delete this._update.$set[field];
                }
            });
        }
        next();
    };

    schema.pre('findOneAndUpdate', protectReadOnlyFields);
    schema.pre('update', protectReadOnlyFields);
    schema.pre('updateOne', protectReadOnlyFields);
    schema.pre('updateMany', protectReadOnlyFields);
};
