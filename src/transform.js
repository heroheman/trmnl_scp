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
   * Extract procedures and description from raw_content
   */
  let procedures = '';
  let description = '';
  
  if (input.raw_content) {
    // Extract procedures
    if (input.raw_content.includes('<strong>Special Containment Procedures:</strong>')) {
      let afterProcedures = input.raw_content.split('<strong>Special Containment Procedures:</strong>')[1];
      
      if (afterProcedures.includes('<strong>Description:</strong>')) {
        procedures = afterProcedures.split('<strong>Description:</strong>')[0]
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      } else if (afterProcedures.includes('<strong>Description</strong>')) {
        procedures = afterProcedures.split('<strong>Description</strong>')[0]
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      }
    }
    
    // Extract description
    if (input.raw_content.includes('<strong>Description:</strong>')) {
      description = input.raw_content.split('<strong>Description:</strong>')[1]
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }
  }

  return {
    ...input,
    object_class: objectClass,
    procedures: procedures,
    description: description
  };
}
