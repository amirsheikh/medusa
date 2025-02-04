import { IPromotionModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { StepResponse, createStep } from "@medusajs/framework/workflows-sdk"

/**
 * The IDs of the promotions to delete.
 */
export type DeletePromotionsStepInput = string[]

export const deletePromotionsStepId = "delete-promotions"
/**
 * This step deletes one or more promotions.
 */
export const deletePromotionsStep = createStep(
  deletePromotionsStepId,
  async (ids: DeletePromotionsStepInput, { container }) => {
    const promotionModule = container.resolve<IPromotionModuleService>(
      Modules.PROMOTION
    )

    await promotionModule.softDeletePromotions(ids)

    return new StepResponse(void 0, ids)
  },
  async (idsToRestore, { container }) => {
    if (!idsToRestore?.length) {
      return
    }

    const promotionModule = container.resolve<IPromotionModuleService>(
      Modules.PROMOTION
    )

    await promotionModule.restorePromotions(idsToRestore)
  }
)
