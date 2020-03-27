import { element, by, ElementFinder } from 'protractor';

export class ResourceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-resource div table .btn-danger'));
  title = element.all(by.css('jhi-resource div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ResourceUpdatePage {
  pageTitle = element(by.id('jhi-resource-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  urlInput = element(by.id('field_url'));
  isFavouriteInput = element(by.id('field_isFavourite'));

  metadataSelect = element(by.id('field_metadata'));
  authorSelect = element(by.id('field_author'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setUrlInput(url: string): Promise<void> {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput(): Promise<string> {
    return await this.urlInput.getAttribute('value');
  }

  getIsFavouriteInput(): ElementFinder {
    return this.isFavouriteInput;
  }

  async metadataSelectLastOption(): Promise<void> {
    await this.metadataSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async metadataSelectOption(option: string): Promise<void> {
    await this.metadataSelect.sendKeys(option);
  }

  getMetadataSelect(): ElementFinder {
    return this.metadataSelect;
  }

  async getMetadataSelectedOption(): Promise<string> {
    return await this.metadataSelect.element(by.css('option:checked')).getText();
  }

  async authorSelectLastOption(): Promise<void> {
    await this.authorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async authorSelectOption(option: string): Promise<void> {
    await this.authorSelect.sendKeys(option);
  }

  getAuthorSelect(): ElementFinder {
    return this.authorSelect;
  }

  async getAuthorSelectedOption(): Promise<string> {
    return await this.authorSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ResourceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-resource-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-resource'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
