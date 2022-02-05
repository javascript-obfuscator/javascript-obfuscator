import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { IArrayUtils } from '../interfaces/utils/IArrayUtils';
import { ISetUtils } from '../interfaces/utils/ISetUtils';

@injectable()
export class SetUtils implements ISetUtils {
    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @param {IArrayUtils} arrayUtils
     */
    public constructor (
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils
    ) {
        this.arrayUtils = arrayUtils;
    }

    /**
     * @param {Set<T>} set
     * @returns {T | undefined}
     */
    public getLastElement <T> (set: Set<T>): T | undefined {
        const array = [...set];

        return this.arrayUtils.getLastElement(array);
    }
}
