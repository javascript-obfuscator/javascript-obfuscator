import * as mocha from 'mocha';
import * as sinon from 'sinon';

import { INodeTransformer } from '../../src/interfaces/node-transformers/INodeTransformer';

export function stubNodeTransformers (nodeTransformers: (new (...args: any[]) => INodeTransformer)[]): void {
    const transformerStubs: sinon.SinonStub[] = [];

    mocha.before(() => {
        for (const nodeTransformer of nodeTransformers) {
            const stub: sinon.SinonStub = sinon
                .stub(nodeTransformer.prototype, 'getVisitor')
                .callsFake(() => null);

            transformerStubs.push(stub);
        }
    });

    mocha.after(() => {
        for (const stub of transformerStubs) {
            stub.restore();
        }
    });
}
