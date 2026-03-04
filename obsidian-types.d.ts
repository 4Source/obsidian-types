import { } from 'obsidian';

declare module 'obsidian' {
	interface App {

		/**
		 * The global instance of the {@link ViewRegistry}.
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
		 * Use recommended {@link Plugin.registerView|registerView} this ensures that view type is automatically unregistered when plugin is unloaded.
		 *
		 * @private reverse engineered
		 */
		registerView(type: string, viewCreator: ViewCreator): void;

		/**
		 * Unregister a view type and the related {@link ViewCreator}. This will only unregister the view type not the extensions using this view type. Make sure providing a new {@link ViewCreator} for the same view type as removed or {@link ViewRegistry.unregisterExtensions|unregisterExtensions} for all extensions using this view type. The view type and the related {@link ViewCreator} will not be automatically register again when the plugin is unloaded, therefore make sure you save the original entry before deleting/replacing it so you can register them again in {@link Plugin.onunload|onunload}.
		 * @param type The type of the view to unregister
		 * 
		 * @private reverse engineered
		 */
		unregisterView(type: string): void;

		/**
		 * Use recommended {@link Plugin.registerExtensions|registerExtensions} this ensures that extensions are automatically unregistered when plugin is unloaded.
		 * 
		 * @private reverse engineered
		 */
		registerExtensions(extensions: Array<string>, viewType: string): void;

		/**
		 * Unregister extensions and their related view type. The extensions and the related view type will not be automatically register again when the plugin is unloaded, therefore make sure you save the original entries before deleting/replacing it so you can register them again in {@link Plugin.onunload|onunload}.
		 * @param extensions The extension strings (without a .) to unregister
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
