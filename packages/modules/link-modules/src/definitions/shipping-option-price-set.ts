import { ModuleJoinerConfig } from "@medusajs/framework/types"
import { LINKS, Modules } from "@medusajs/framework/utils"

export const ShippingOptionPriceSet: ModuleJoinerConfig = {
  serviceName: LINKS.ShippingOptionPriceSet,
  isLink: true,
  databaseConfig: {
    tableName: "shipping_option_price_set",
    idPrefix: "sops",
  },
  alias: [
    {
      name: ["shipping_option_price_set", "shipping_option_price_sets"],
      entity: "LinkShippingOptionPriceSet",
    },
  ],
  primaryKeys: ["id", "shipping_option_id", "price_set_id"],
  relationships: [
    {
      serviceName: Modules.FULFILLMENT,
      entity: "ShippingOption",
      primaryKey: "id",
      foreignKey: "shipping_option_id",
      alias: "shipping_option",
      args: {
        methodSuffix: "ShippingOptions",
      },
    },
    {
      serviceName: Modules.PRICING,
      entity: "PriceSet",
      primaryKey: "id",
      foreignKey: "price_set_id",
      alias: "price_set",
      args: {
        methodSuffix: "PriceSets",
      },
      deleteCascade: true,
    },
  ],
  extends: [
    {
      serviceName: Modules.FULFILLMENT,
      entity: "ShippingOption",
      fieldAlias: {
        prices: {
          path: "price_set_link.price_set.prices",
          isList: true,
        },
        calculated_price: {
          path: "price_set_link.price_set.calculated_price",
          forwardArgumentsOnPath: ["price_set_link.price_set"],
        },
      },
      relationship: {
        serviceName: LINKS.ShippingOptionPriceSet,
        primaryKey: "shipping_option_id",
        foreignKey: "id",
        alias: "price_set_link",
      },
    },
    {
      serviceName: Modules.PRICING,
      entity: "PriceSet",
      relationship: {
        serviceName: LINKS.ShippingOptionPriceSet,
        primaryKey: "price_set_id",
        foreignKey: "id",
        alias: "shipping_option_link",
      },
      fieldAlias: {
        shipping_option: "shipping_option_link.shipping_option",
      },
    },
  ],
}
