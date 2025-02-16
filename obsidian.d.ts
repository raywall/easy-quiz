declare module 'obsidian' {
    export interface App {
        plugins: {
            enablePlugin(id: string): Promise<void>;
        };
    }
}