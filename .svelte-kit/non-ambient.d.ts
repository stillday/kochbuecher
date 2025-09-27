
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(protected)" | "/" | "/(protected)/cookbooks" | "/(protected)/cookbooks/new" | "/(protected)/cookbooks/[id]" | "/forgot-password" | "/login" | "/(protected)/recipes" | "/(protected)/recipes/new" | "/(protected)/recipes/[id]" | "/register" | "/(protected)/shared-with-me" | "/update-password";
		RouteParams(): {
			"/(protected)/cookbooks/[id]": { id: string };
			"/(protected)/recipes/[id]": { id: string }
		};
		LayoutParams(): {
			"/(protected)": { id?: string };
			"/": { id?: string };
			"/(protected)/cookbooks": { id?: string };
			"/(protected)/cookbooks/new": Record<string, never>;
			"/(protected)/cookbooks/[id]": { id: string };
			"/forgot-password": Record<string, never>;
			"/login": Record<string, never>;
			"/(protected)/recipes": { id?: string };
			"/(protected)/recipes/new": Record<string, never>;
			"/(protected)/recipes/[id]": { id: string };
			"/register": Record<string, never>;
			"/(protected)/shared-with-me": Record<string, never>;
			"/update-password": Record<string, never>
		};
		Pathname(): "/" | "/cookbooks" | "/cookbooks/" | "/cookbooks/new" | "/cookbooks/new/" | `/cookbooks/${string}` & {} | `/cookbooks/${string}/` & {} | "/forgot-password" | "/forgot-password/" | "/login" | "/login/" | "/recipes" | "/recipes/" | "/recipes/new" | "/recipes/new/" | `/recipes/${string}` & {} | `/recipes/${string}/` & {} | "/register" | "/register/" | "/shared-with-me" | "/shared-with-me/" | "/update-password" | "/update-password/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}