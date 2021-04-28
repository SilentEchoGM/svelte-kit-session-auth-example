<script context="module">
	import error from '$lib/error';

	export const load = async ({ session }) => {
		if (session.authenticated) {
			console.log('Authorized (auth/unauthorized.load)', session);
			return {
				status: 302,
				redirect: '../user'
			};
		} else {
			console.log('Unauthorized (auth/unauthorized.load)', session);
			return {
				props: {
					error: error.S93
				}
			};
		}
	};
</script>

<script>
	import { goto } from '$app/navigation';
</script>

<h1>Unauthorized.</h1>

<button on:click={() => goto('/')}>Back</button>
