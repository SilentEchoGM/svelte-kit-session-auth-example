<script>
	import { goto } from '$app/navigation';
	import Login from '$lib/auth/Login.svelte';
	import Register from '$lib/auth/Register.svelte';
	import { session } from '$app/stores';

	const redirectToProfile = () => {
		$session.authenticated = true;
		goto('/user');
	};
</script>

<main>
	<Login on:success={redirectToProfile} />
	<Register on:success={redirectToProfile} />
</main>
