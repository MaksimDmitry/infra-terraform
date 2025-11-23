// parser.js
import { parse } from 'terraform-cdk';
import { Resource } from './resource';
import { Provider } from './provider';

class TerraformParser {
  constructor(tfFile) {
    this.tfFile = tfFile;
  }

  async parse() {
    const terraform = await parse(this.tfFile);
    const resources = terraform.resources.all();
    const providers = terraform.providers.all();

    resources.forEach((resource) => {
      const data = resource.data;
      const name = resource.type;
      const properties = resource.properties;

      const resourceObject = new Resource({
        name,
        properties,
      });
    });

    providers.forEach((provider) => {
      const name = provider.name;
      const version = provider.version;

      const providerObject = new Provider({
        name,
        version,
      });
    });
  }
}

export { TerraformParser };