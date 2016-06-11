import { IKernel } from "inversify";
import { IObfuscator } from "./interfaces/IObfuscator";
import { IOptions } from "./interfaces/IOptions";

import { Kernel } from "inversify";
import { Obfuscator } from "./Obfuscator";
import { Options } from "./Options";

let kernel: IKernel = new Kernel();

kernel.bind<IOptions>('IOptions').to(Options);
kernel.bind<IObfuscator>('IObfuscator').to(Obfuscator);

export default kernel;
