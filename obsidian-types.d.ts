import { } from 'obsidian';

declare module 'obsidian' {
	interface App {

		/**
		 * The global instance of the {@link ViewRegistry}.
		 * @instance
		 *
		 * @private reverse engineered
		 */
		viewRegistry: ViewRegistry
	}

	interface ViewRegistry extends Events {

		/**
		 * Holds the records for mapping the view type to the {@link ViewCreator}.
		 *
		 * @private reverse engineered
		 */
		viewByType: Record<string, ViewCreator>;

		/**
		 * Holds the records for mapping the extensions to the view type.
		 *
		 * @private reverse engineered
		 */
		typeByExtension: Record<string, string>;

		/**
		 * Use recommended {@link Plugin.registerView|registerView} this ensures that view type is automatically unregistered when plugin is unloaded. Only use this function in {@link Plugin.onunload|onunload} to reregister the original view type.
		 *
		 * @private reverse engineered
		 */
		registerView(type: string, viewCreator: ViewCreator): void;

		/**
		 * Unregister a view type and the related {@link ViewCreator}. This will only unregister the view type not the extensions using this view type. Make sure providing a new {@link ViewCreator} for the same view type as removed or {@link ViewRegistry.unregisterExtensions|unregisterExtensions} for all extensions using this view type. The view type and the related {@link ViewCreator} will not be automatically register again when the plugin is unloaded, therefore make sure you save the original entry before deleting/replacing it so you can register them again in {@link Plugin.onunload|onunload} with {@link ViewRegistry.registerView|registerView}.
		 * @param type The type of the view to unregister
		 *
		 * @example
		 * ### Replacing the view of an existing view type and restoring it properly
		 * ```ts
		 * export default class ExamplePlugin extends Plugin {
		 * 	originalViews: Record<string, ViewCreator> = {};
		 *
		 * 	async onload() {
		 * 		// Backup the view type to ViewCreator mapping
		 * 		if (this.app.viewRegistry.viewByType.hasOwnProperty(type)) {
		 * 			const creator = this.app.viewRegistry.getViewCreatorByType(type);
		 * 			if (creator) {
		 * 				this.originalViews[type] = creator;
		 * 			}
		 *
		 * 			// Unregister existing view
		 * 			this.app.viewRegistry.unregisterView(type);
		 * 		}
		 *
		 * 		// Register view
		 * 		this.registerView(type, viewCreator);
		 * 	}
		 *
		 * 	async onunload() {
		 * 		// Restore original view entries
		 * 		for (const entry of Object.entries(this.originalViews)) {
		 * 			this.app.viewRegistry.registerView(entry[0], entry[1]);
		 * 		}
		 * 	}
		 * }
		 * ```
		 *
		 * @private reverse engineered
		 */
		unregisterView(type: string): void;

		/**
		 * Use recommended {@link Plugin.registerExtensions|registerExtensions} this ensures that extensions are automatically unregistered when plugin is unloaded. Only use this function in {@link Plugin.onunload|onunload} to reregister the original extensions.
		 *
		 * @private reverse engineered
		 */
		registerExtensions(extensions: Array<string>, viewType: string): void;

		/**
		 * Unregister extensions and their related view type. The extensions and the related view type will not be automatically register again when the plugin is unloaded, therefore make sure you save the original entries before deleting/replacing it so you can register them again in {@link Plugin.onunload|onunload} with {@link ViewRegistry.registerExtensions|registerExtensions}.
		 * @param extensions The extension strings (without a .) to unregister
		 *
		 * @example
		 * ### Replacing the view of an existing extension and restoring it properly
		 * ```ts
		 * export default class ExamplePlugin extends Plugin {
		 * 	originalExtensions: Record<string, string[]> = {};
		 *
		 * 	async onload() {
		 * 		this.registerView(VIEW_TYPE_EXAMPLE, (leaf) => new ExampleView(leaf));
		 *
		 * 		// The extensions to backup, unregister, and register with ExampleView
		 * 		const extensions = ['ext'];
		 *
		 * 		// Backup the extensions to type mapping
		 * 		const unregisterExtensions: string[] = [];
		 * 		for (const extension of extensions) {
		 * 			if (this.app.viewRegistry.isExtensionRegistered(extension)) {
		 * 				const type = this.app.viewRegistry.getTypeByExtension(extension);
		 * 				if (type) {
		 * 					if (!this.originalExtensions[type]) {
		 * 						this.originalExtensions[type] = [];
		 * 					}
		 * 					this.originalExtensions[type].push(extension);
		 * 				}
		 * 				unregisterExtensions.push(extension);
		 * 			}
		 * 		}
		 *
		 * 		// Unregister existing extensions
		 * 		this.app.viewRegistry.unregisterExtensions(unregisterExtensions);
		 *
		 * 		// Register extensions to be opened with the own view
		 * 		this.registerExtensions(extensions, VIEW_TYPE_EXAMPLE);
		 * 	}
		 *
		 * 	async onunload() {
		 * 		// Restore original extension entries
		 * 		for (const entry of Object.entries(this.originalExtensions)) {
		 * 			this.app.viewRegistry.registerExtensions(entry[1], entry[0]);
		 * 		}
		 * 	}
		 * }
		 * ```
		 *
		 * @private reverse engineered
		 */
		unregisterExtensions(extensions: Array<string>): void;

		/**
		 * Use recommended {@link Plugin.registerView|registerView} and {@link Plugin.registerExtensions|registerExtensions} this ensures that view type and extensions are automatically unregistered when plugin is unloaded.
		 *
		 * @private reverse engineered
		 */
		registerViewWithExtensions(extensions: Array<string>, viewType: string, viewCreator: ViewCreator): void;

		/**
		 * Get the {@link ViewCreator} for the registered view type if existing.
		 * @param viewType The view type for which the {@link ViewCreator} should be returned.
		 * @returns The {@link ViewCreator} if registered otherwise returns `undefined`.
		 *
		 * @private reverse engineered
		 */
		getViewCreatorByType(viewType: string): ViewCreator | undefined;

		/**
		 * Get the view type for the registered extension if existing.
		 * @param extension The extension for which the view type should be returned.
		 * @returns The view type if registered otherwise returns `undefined`.
		 *
		 * @private reverse engineered
		 */
		getTypeByExtension(extension: string): string | undefined;

		/**
		 * Checks if a view type is register for the extension
		 *
		 * @param extension The extension to check
		 * @returns `true` if a view type is registered for the extension
		 *
		 * @private reverse engineered
		 */
		isExtensionRegistered(extension: string): boolean;
	}
}
