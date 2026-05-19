export function useVisitedSite() {
	const visitedSiteCookie = useCookie<boolean | string | null>('visited_site', {
		sameSite: 'lax',
		secure: true,
		maxAge: 60 * 60 * 24 * 365 * 5 // 5 years
	});

	if (visitedSiteCookie.value != null && visitedSiteCookie.value !== true) {
		visitedSiteCookie.value = true;
	}

	const visitedSite = computed(() => visitedSiteCookie.value != null);

	const markVisited = () => {
		visitedSiteCookie.value = true;
	};

	return {
		visitedSite,
		visitedSiteCookie,
		markVisited
	};
}
