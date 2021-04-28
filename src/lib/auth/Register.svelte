<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let email, password, username, error;

	const register = async () => {
		error = undefined;
		try {
			const res = await fetch('/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password,
					username
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (res.ok) {
				dispatch('success');
			} else {
				error = 'An error occured';
			}
		} catch (err) {
			console.log(err);
			error = 'An error occured';
		}
	};
</script>

<h2>Register</h2>
<input type="email" bind:value={email} placeholder="email" />
<input type="text" bind:value={username} placeholder="username" />
<input type="password" bind:value={password} placeholder="password" />

<button on:click={register}>Register</button>
