/**
 * TRMNL SCP Plugin - Transform Function
 * 
 * Extracts and prepares SCP data for display.
 * Extracts object class, procedures, and description in JavaScript
 * to simplify Liquid templates.
 */

function transform(input) {
  /**
   * Extract object class from tags
   */
  const knownClasses = ['safe', 'euclid', 'keter', 'thaumiel', 'apollyon', 'neutralized', 'decommissioned', 'pending', 'explained'];
  let objectClass = '';
  
  if (input.tags) {
    for (const tag of input.tags) {
      if (knownClasses.includes(tag.toLowerCase())) {
        objectClass = tag;
        break;
      }
    }
    
    if (!objectClass) {
      for (const tag of input.tags) {
        if (tag.includes('esoteric-class')) {
          objectClass = 'Esoteric';
          break;
        }
      }
    }
  }

  /**
   * Helper function to clean HTML while preserving paragraph breaks
   * Similar to advanced_rss approach but converts paragraphs to double line breaks
   */
  const cleanHtml = (html) => {
    if (!html) return '';
    
    // Convert paragraph endings to double newlines BEFORE removing tags
    let cleaned = html
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/div>/gi, '\n');
    
    // Remove all HTML tags
    cleaned = cleaned.replace(/<[^>]*>/g, ' ');
    
    // Normalize whitespace on each line but keep line breaks
    cleaned = cleaned
      .split('\n')
      .map(line => line.replace(/\s+/g, ' ').trim())
      .join('\n');
    
    // Limit consecutive newlines to 2
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    
    return cleaned.trim();
  };

  /**
   * Extract procedures and description from raw_content
   */
  let procedures = '';
  let description = '';
  
  if (input.raw_content) {
    // Extract procedures
    if (input.raw_content.includes('<strong>Special Containment Procedures:</strong>')) {
      let afterProcedures = input.raw_content.split('<strong>Special Containment Procedures:</strong>')[1];
      
      if (afterProcedures.includes('<strong>Description:</strong>')) {
        procedures = cleanHtml(afterProcedures.split('<strong>Description:</strong>')[0]);
      } else if (afterProcedures.includes('<strong>Description</strong>')) {
        procedures = cleanHtml(afterProcedures.split('<strong>Description</strong>')[0]);
      }
    }
    
    // Extract description
    if (input.raw_content.includes('<strong>Description:</strong>')) {
      description = cleanHtml(input.raw_content.split('<strong>Description:</strong>')[1]);
    }
  }

  return {
    ...input,
    object_class: objectClass,
    procedures: procedures,
    description: description
  };
}
