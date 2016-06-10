import { IKernel } from "inversify";
import { IObfuscator } from "./interfaces/IObfuscator";

import { Kernel } from "inversify";
import { Obfuscator } from "./Obfuscator";

let kernel: IKernel = new Kernel();

kernel.bind<IObfuscator>('IObfuscator').to(Obfuscator);

export default kernel;
