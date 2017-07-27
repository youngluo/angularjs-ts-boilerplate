declare module '*.html' {
	const content: string
	export default content
}

declare function require(arg: string): any

declare var module
