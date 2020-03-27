package com.ochiwerks.apps.gallery.service;

import com.ochiwerks.apps.gallery.domain.Metadata;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Metadata}.
 */
public interface MetadataService {

    /**
     * Save a metadata.
     *
     * @param metadata the entity to save.
     * @return the persisted entity.
     */
    Metadata save(Metadata metadata);

    /**
     * Get all the metadata.
     *
     * @return the list of entities.
     */
    List<Metadata> findAll();

    /**
     * Get the "id" metadata.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Metadata> findOne(Long id);

    /**
     * Delete the "id" metadata.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
