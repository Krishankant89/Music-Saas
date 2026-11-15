export function formatDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0 || !isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function formatTimeAgo(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    if (diffDays <= 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  } catch {
    return dateString;
  }
}
