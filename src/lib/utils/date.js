export const dateOptions = {
	timeZone: 'America/New_York',
	year: '2-digit',
	month: 'short',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit'
};

const formatDate = new Intl.DateTimeFormat('en-US', dateOptions);

export const dateString = () => formatDate.format(Date.now());
