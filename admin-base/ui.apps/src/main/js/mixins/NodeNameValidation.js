export default {
    data() {
        return {
            formmodel: {
                path: $perAdminApp.getNodeFromView('/state/tools/pages'),
                name: '',
                title: '',
                templatePath: '',
                skeletonPagePath: ''
            },
            formOptions: {
                validationErrorClass: "has-error",
                validationSuccessClass: "has-success",
                validateAfterChanged: true,
                focusFirstField: true
            },
            nameChanged: false,
            nameSchema: {
                fields: [
                    {
                        type: "input",
                        inputType: "text",
                        label: "Title",
                        model: "title",
                        required: true,
                        onChanged: (model, newVal, oldVal, field) => {
                          if(!this.nameChanged && this.uNodeType !== "Asset") {
                              this.formmodel.name = $perAdminApp.normalizeString(newVal);
                          }
                        }
                    },
                    {
                        type: "input",
                        inputType: "text",
                        label: "Name",
                        model: "name",
                        required: true,
                        onChanged: (model, newVal, oldVal, field) => {
                            this.nameChanged = true;
                        },
                        validator: [this.nameAvailable, this.validPageName]
                    }
                ]
            }
        }
    },
    methods: {
        validPageName: function(event) {
            let value = event
            if (event && event instanceof Object && event.data) {
                value = event.data
            }
            if(!value || value.length === 0) {
                return ['name is required.']
            }
            let regExMatch = /[^0-9a-zA-Z_-]/
            let errorMsg = 'page names may only contain letters, numbers, underscores, and dashes'
            if (this.uNodeType === "Asset") {
                regExMatch = /[^0-9a-z.A-Z_-]/
                errorMsg = 'assets names may only contain letters, numbers, underscores, and dashes'
            }

            if (value.match(regExMatch)) {
                return [errorMsg]
            }
            return [];
        },
        nameAvailable: function(value) {
            if(!value || value.length === 0) {
                return ['name is required']
            }
            if (this.node) {
                const parent = this.node.path.replace("/"+this.node.name, "")
                if ($perAdminApp.getApi().nameAvailable(value, parent)) {
                    return []
                } else {
                    return ['name aready in use']
                }
            } else {
                $perAdminApp.getApi().nameAvailable
                const folder = $perAdminApp.findNodeFromPath($perAdminApp.getView().admin.nodes, this.formmodel.path)
                for(let i = 0; i < folder.children.length; i++) {
                    if(folder.children[i].name === value) {
                        return ['name aready in use']
                    }
                }
                return []
            }
        }
    }
}