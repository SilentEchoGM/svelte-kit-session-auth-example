<script context="module">
	export const load = async ({ session }) => {
		if (!session.authenticated) {
			console.log('Unauthorized', session);
			return {
				status: 302,
				redirect: 'auth/unauthorized'
			};
		}
		console.log('Authorized', session);
		return {
			props: {
				email: session.email
			}
		};
	};
</script>

<script>
	export let email;

	import Logout from '$lib/auth/Logout.svelte';
	import { onMount } from 'svelte';

	let username;
	onMount(async () => {
		console.log('fetching user');
		const result = await fetch('/user/load');
		console.log(result);
		const user = await result.json();
		console.log('fetched user:', result, '*', user);
		username = user.username;
		email = user.email;
	});
</script>

<h1>User Page</h1>
<p>Hello {username} with {email}</p>
<Logout />
