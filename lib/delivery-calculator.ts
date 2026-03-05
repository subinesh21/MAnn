// Pincode-based Delivery Cost Calculator
interface PincodeZone {
  zone: 'metro' | 'tier1' | 'tier2' | 'tier3' | 'remote';
  cost: number;
  deliveryDays: string;
  states: string[];
}

// Indian pincode zones mapping
const PINCODE_ZONES: Record<string, PincodeZone> = {
  // Metro Cities (Free shipping)
  '110': { zone: 'metro', cost: 0, deliveryDays: '1-2', states: ['Delhi'] },
  '400': { zone: 'metro', cost: 0, deliveryDays: '1-2', states: ['Maharashtra'] },
  '560': { zone: 'metro', cost: 0, deliveryDays: '1-2', states: ['Karnataka'] },
  '600': { zone: 'metro', cost: 0, deliveryDays: '1-2', states: ['Tamil Nadu'] },
  '700': { zone: 'metro', cost: 0, deliveryDays: '1-2', states: ['West Bengal'] },
  
  // Tier 1 Cities
  '122': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Haryana'] },
  '141': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Punjab'] },
  '160': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Punjab'] },
  '181': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Jammu and Kashmir'] },
  '201': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Uttar Pradesh'] },
  '211': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Uttar Pradesh'] },
  '226': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Uttar Pradesh'] },
  '302': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Rajasthan'] },
  '380': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Gujarat'] },
  '411': { zone: 'tier1', cost: 20, deliveryDays: '2-3', states: ['Maharashtra'] },
  
  // Tier 2 Cities
  '133': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Haryana'] },
  '143': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Punjab'] },
  '151': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Punjab'] },
  '202': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Uttar Pradesh'] },
  '241': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Uttar Pradesh'] },
  '301': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Rajasthan'] },
  '390': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Gujarat'] },
  '413': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Maharashtra'] },
  '500': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Telangana'] },
  '520': { zone: 'tier2', cost: 40, deliveryDays: '3-5', states: ['Andhra Pradesh'] },
  
  // Tier 3 Cities
  '171': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Himachal Pradesh'] },
  '182': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Jammu and Kashmir'] },
  '231': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Uttar Pradesh'] },
  '261': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Uttarakhand'] },
  '313': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Rajasthan'] },
  '360': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Gujarat'] },
  '431': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Maharashtra'] },
  '530': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Andhra Pradesh'] },
  '620': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Tamil Nadu'] },
  '680': { zone: 'tier3', cost: 60, deliveryDays: '5-7', states: ['Kerala'] },
  
  // Remote Areas
  '175': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Himachal Pradesh'] },
  '176': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Himachal Pradesh'] },
  '177': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Himachal Pradesh'] },
  '190': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Jammu and Kashmir'] },
  '191': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Jammu and Kashmir'] },
  '192': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Jammu and Kashmir'] },
  '246': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Uttarakhand'] },
  '247': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Uttarakhand'] },
  '248': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Uttarakhand'] },
  '249': { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Uttarakhand'] }
};

export class DeliveryCalculator {
  static validatePincode(pincode: string): boolean {
    // Indian pincode validation (6 digits)
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
  }

  static getDeliveryInfo(pincode: string): {
    isValid: boolean;
    zone?: PincodeZone;
    cost?: number;
    deliveryDays?: string;
    freeShippingEligible?: boolean;
  } {
    if (!this.validatePincode(pincode)) {
      return { isValid: false };
    }

    // Get first 3 digits to determine zone
    const pinPrefix = pincode.substring(0, 3);
    const zoneInfo = PINCODE_ZONES[pinPrefix];

    if (!zoneInfo) {
      // Default to remote area for unknown pincodes
      return {
        isValid: true,
        zone: { zone: 'remote', cost: 100, deliveryDays: '7-10', states: ['Unknown'] },
        cost: 100,
        deliveryDays: '7-10',
        freeShippingEligible: false
      };
    }

    return {
      isValid: true,
      zone: zoneInfo,
      cost: zoneInfo.cost,
      deliveryDays: zoneInfo.deliveryDays,
      freeShippingEligible: zoneInfo.zone === 'metro'
    };
  }

  static calculateDeliveryCost(pincode: string, orderAmount: number): {
    baseCost: number;
    finalCost: number;
    isFree: boolean;
    deliveryDays: string;
  } {
    const deliveryInfo = this.getDeliveryInfo(pincode);
    
    if (!deliveryInfo.isValid) {
      throw new Error('Invalid pincode');
    }

    const { SHIPPING_CONFIG } = require('./payment-config');
    const baseCost = deliveryInfo.cost || SHIPPING_CONFIG.BASE_DELIVERY_COST;
    
    // Free shipping for metro areas or orders above threshold
    const isFree = deliveryInfo.freeShippingEligible || 
                   orderAmount >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
    
    return {
      baseCost,
      finalCost: isFree ? 0 : baseCost,
      isFree,
      deliveryDays: deliveryInfo.deliveryDays || '5-7'
    };
  }

  static getAllStates(): string[] {
    const states = new Set<string>();
    Object.values(PINCODE_ZONES).forEach(zone => {
      zone.states.forEach(state => states.add(state));
    });
    return Array.from(states).sort();
  }

  static getStateByPincode(pincode: string): string | null {
    if (!this.validatePincode(pincode)) return null;
    
    const pinPrefix = pincode.substring(0, 3);
    const zoneInfo = PINCODE_ZONES[pinPrefix];
    
    return zoneInfo ? zoneInfo.states[0] : null;
  }
}

// Export types
export type { PincodeZone };