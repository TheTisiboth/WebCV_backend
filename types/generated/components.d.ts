import type { Schema, Struct } from '@strapi/strapi';

export interface CitiesCoordinate extends Struct.ComponentSchema {
  collectionName: 'components_cities_coordinates';
  info: {
    description: '';
    displayName: 'coordinate';
    icon: 'pinMap';
  };
  attributes: {
    lat: Schema.Attribute.Decimal & Schema.Attribute.Required;
    lng: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface HistoryPicture extends Struct.ComponentSchema {
  collectionName: 'components_history_pictures';
  info: {
    description: '';
    displayName: 'dates';
    icon: 'calendar';
  };
  attributes: {
    endDate: Schema.Attribute.Date;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
  };
}

export interface ProjectCodeRepository extends Struct.ComponentSchema {
  collectionName: 'components_project_code_repositories';
  info: {
    description: '';
    displayName: 'CodeRepository';
    icon: 'code';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.Enumeration<['github', 'gitlab']> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cities.coordinate': CitiesCoordinate;
      'history.picture': HistoryPicture;
      'project.code-repository': ProjectCodeRepository;
    }
  }
}
