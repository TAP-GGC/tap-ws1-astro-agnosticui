export function formatIDtoName(id) {
    return id
      .split('-') // Split by hyphens
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join with spaces
  }