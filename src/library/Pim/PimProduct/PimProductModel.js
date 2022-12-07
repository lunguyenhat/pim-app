/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import BaseItemModel from 'aesirx-dma-lib/src/Abstract/BaseItemModel';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from '../../Constant/PimConstant';
class ProductItemModel extends BaseItemModel {
  id = null;
  sku = null;
  title = null;
  alias = null;
  published = 0;
  featured = 0;
  category_id = null;
  category_name = null;
  custom_fields = null;
  created_user_name = null;
  created_time = null;
  publish_up = null;

  constructor(entity) {
    super(entity);
    if (entity) {
      this.id = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.ID] ?? '';
      this.sku = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.SKU] ?? 0;
      this.title = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE] ?? '';
      this.alias = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS] ?? '';
      this.published = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED] ?? 0;
      this.featured = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED]?.toString() ?? '0';
      this.category_id = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID] ?? 0;
      this.category_name = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME] ?? '';
      this.custom_fields = {};
      this.created_user_name = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME] ?? '';
      this.created_time = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_TIME] ?? '';
      this.publish_up = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISH_UP] ?? '';
      this.tags = entity[PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS][0] ?? '';
    }
  }

  toObject = () => {
    return {};
  };

  toJSON = () => {
    return {
      ...this.baseToJSON(),
      [PIM_PRODUCT_DETAIL_FIELD_KEY.ID]: this.id,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.SKU]: this.sku,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.TITLE]: this.title,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.ALIAS]: this.alias,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISHED]: this.published,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.FEATURED]: this.featured,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_ID]: this.category_id,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.CATEGORY_NAME]: this.category_name,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS]: this.custom_fields,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.CREATED_USER_NAME]: this.created_user_name,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.PUBLISH_UP]: this.publish_up,
      [PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS]: this.tags,
    };
  };

  static __transformItemToApiOfCreation = (data) => {
    let formData = new FormData();
    const excluded = [PIM_PRODUCT_DETAIL_FIELD_KEY.ID];
    Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
      if (!excluded.includes(index) && data[PIM_PRODUCT_DETAIL_FIELD_KEY[index]]) {
        formData.append(
          [PIM_PRODUCT_DETAIL_FIELD_KEY[index]],
          data[PIM_PRODUCT_DETAIL_FIELD_KEY[index]]
        );
      }
    });
    formData.append([PIM_PRODUCT_DETAIL_FIELD_KEY.ID], data[PIM_PRODUCT_DETAIL_FIELD_KEY.ID] ?? 0);
    return formData;
  };

  static __transformItemToApiOfUpdation = (data) => {
    let formData = {};
    const excluded = [
      PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS,
      PIM_PRODUCT_DETAIL_FIELD_KEY.TAGS,
    ];
    Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
      if (
        !excluded.includes(PIM_PRODUCT_DETAIL_FIELD_KEY[index]) &&
        data[PIM_PRODUCT_DETAIL_FIELD_KEY[index]]
      ) {
        formData[PIM_PRODUCT_DETAIL_FIELD_KEY[index]] = data[PIM_PRODUCT_DETAIL_FIELD_KEY[index]];
      }
    });
    if (Object.keys(data[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS]).length) {
      formData['custom_fields'] = Object.keys(data[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS])
        .map((key) => {
          return {
            [key]: data[PIM_PRODUCT_DETAIL_FIELD_KEY.CUSTOM_FIELDS][key],
          };
        })
        .reduce((prev, curr) => curr);
    }

    return formData;
  };
}

export { ProductItemModel };