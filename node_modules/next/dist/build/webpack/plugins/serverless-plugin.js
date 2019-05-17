"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GraphHelpers_1 = __importDefault(require("webpack/lib/GraphHelpers"));
/**
 * Makes sure there are no dynamic chunks when the target is serverless
 * The dynamic chunks are integrated back into their parent chunk
 * This is to make sure there is a single render bundle instead of that bundle importing dynamic chunks
 */
class ServerlessPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('ServerlessPlugin', compilation => {
            compilation.hooks.optimizeChunksBasic.tap('ServerlessPlugin', chunks => {
                chunks.forEach((chunk) => {
                    // If chunk is not an entry point skip them
                    if (chunk.hasEntryModule()) {
                        const dynamicChunks = chunk.getAllAsyncChunks();
                        if (dynamicChunks.size !== 0) {
                            for (const dynamicChunk of dynamicChunks) {
                                for (const module of dynamicChunk.modulesIterable) {
                                    GraphHelpers_1.default.connectChunkAndModule(chunk, module);
                                }
                            }
                        }
                    }
                });
            });
        });
    }
}
exports.ServerlessPlugin = ServerlessPlugin;
